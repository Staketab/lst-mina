import React from 'react';
import style from '../index.module.css';
import AccountName from '../../../../organisms/accountName';

const AccountTemplate = ({ data, config }) => {
    const pk = data[config.fields?.pk];
    const img = data[config.fields.img];
    const name = data[config.fields.name];
    const view = config.view;
    const isPkArray = Array.isArray(pk);
    const newImg = isPkArray ? pk[0]?.[config?.fields?.nestedImg] : img;
    const newName = isPkArray ? pk[0]?.[config?.fields?.nestedName] : name;
    const noRedirectFromValue = config.fields.noRedirectFromValue;
    const noRedirectFromData = data[config.fields.noRedirectFromData];
    const redirect = config.fields.getRedirectFromData
        ? config.fields.getRedirectFromData(data)
        : config.fields.redirect || 'account';
    const noRedirect = noRedirectFromData ?? (noRedirectFromValue ? noRedirectFromValue(pk) : config.fields.noRedirect);

    return (
        <div className={style.accountTemplate}>
            <AccountName
                name={newName}
                img={newImg}
                pk={pk}
                view={view}
                redirect={redirect}
                getRedirectLink={
                    config.fields.getRedirectLink
                        ? (pk) => config.fields.getRedirectLink(pk, data[config.fields.isValidator])
                        : null
                }
                noRedirect={noRedirect}
            />
        </div>
    );
};

export default AccountTemplate;
