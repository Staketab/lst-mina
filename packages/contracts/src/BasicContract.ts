import {
  Field,
  SmartContract,
  state,
  State,
  method,
  PublicKey,
  UInt64,
  Int64,
  Bool,
  AccountUpdate,
  Permissions,
  VerificationKey,
  Account,
} from 'o1js';

const tokenSymbol = 'stMINA';

export class BasicContract extends SmartContract {
  @state(Field) num = State<Field>();
  @state(UInt64) totalAmountInCirculation = State<UInt64>();

  init() {
    super.init();
    this.num.set(Field(1));
    this.account.tokenSymbol.set(tokenSymbol);
    this.totalAmountInCirculation.set(UInt64.zero);
  }

  @method mint(address: PublicKey, vk: VerificationKey, amount: UInt64) {
    const initAmount = UInt64.from(Number(100000000) * 1e9);

    let totalAmountInCirculation = this.totalAmountInCirculation.get();
    this.totalAmountInCirculation.assertEquals(totalAmountInCirculation);
    let newTotalAmountInCirculation = totalAmountInCirculation.add(
      amount || initAmount
    );

    this.token.mint({ address, amount: amount || initAmount });
    const update = AccountUpdate.createSigned(address, this.token.id);
    const permissionToEdit = Permissions.proof();

    update.body.update.verificationKey = { isSome: Bool(true), value: vk };
    update.body.update.permissions = {
      isSome: Bool(true),
      value: {
        ...Permissions.default(),
        setDelegate: permissionToEdit,
        incrementNonce: permissionToEdit,
        setVotingFor: permissionToEdit,
        setTiming: permissionToEdit,
      },
    };
    this.totalAmountInCirculation.set(newTotalAmountInCirculation);
  }

  transfer(from: PublicKey, to: PublicKey | AccountUpdate, amount: UInt64) {
    if (to instanceof PublicKey)
      return this.transferToAddress(from, to, amount);
    if (to instanceof AccountUpdate)
      return this.transferToUpdate(from, to, amount);
  }

  @method balanceOf(owner: PublicKey): UInt64 {
    let account = Account(owner, this.token.id);
    let balance = account.balance.getAndAssertEquals();
    return balance;
  }

  @method transferToAddress(from: PublicKey, to: PublicKey, value: UInt64) {
    this.token.send({ from, to, amount: value });
  }

  @method transferToUpdate(from: PublicKey, to: AccountUpdate, value: UInt64) {
    this.token.send({ from, to, amount: value });
  }

  @method approveUpdateAndSend(
    zkappUpdate: AccountUpdate,
    to: PublicKey,
    amount: UInt64
  ) {
    let { StaticChildren, AnyChildren } = AccountUpdate.Layout;
    this.approve(zkappUpdate, StaticChildren(AnyChildren, AnyChildren));
    zkappUpdate.body.mayUseToken.parentsOwnToken.assertTrue();
    let [grandchild1, grandchild2] = zkappUpdate.children.accountUpdates;
    grandchild1.body.mayUseToken.inheritFromParent.assertFalse();
    grandchild2.body.mayUseToken.inheritFromParent.assertFalse();

    // see if balance change cancels the amount sent
    let balanceChange = Int64.fromObject(zkappUpdate.body.balanceChange);
    balanceChange.assertEquals(Int64.from(amount).neg());
    // add same amount of tokens to the receiving address
    this.token.mint({ address: to, amount });
  }

  @method sendTokens(
    senderAddress: PublicKey,
    receiverAddress: PublicKey,
    amount: UInt64
  ) {
    this.token.send({
      from: senderAddress,
      to: receiverAddress,
      amount,
    });
  }

  @method updateTokenAccount(value: Field, address: PublicKey) {
    const zkAppTokenAccount = new TokenAccount(address, this.token.id);
    zkAppTokenAccount.update(value);
  }

  @method approveSend() {
    let amount = UInt64.from(1_000);
    this.balance.subInPlace(amount);
  }
}

export class TokenAccount extends SmartContract {
  @state(Field) value = State<Field>();

  @method update(value: Field) {
    const oldValue = this.value.getAndAssertEquals();
    oldValue.assertEquals(value.sub(Field(1)));
    this.value.set(value);
  }
}
