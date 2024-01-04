import { LocalhostAppChain } from "@proto-kit/cli";
import runtime from "./runtime";

export default LocalhostAppChain.fromRuntime(runtime) as any;
