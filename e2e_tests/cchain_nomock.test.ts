import { getCoinflect, createTests, Matcher } from "./e2etestlib"
import { KeystoreAPI } from "src/apis/keystore/api"
import BN from "bn.js"
import Coinflect from "src"
import { EVMAPI } from "src/apis/evm"

describe("CChain", (): void => {
  const coinflect: Coinflect = getCoinflect()
  const cchain: EVMAPI = coinflect.CChain()
  const keystore: KeystoreAPI = coinflect.NodeKeys()

  let exportTxHash = { value: "" }

  const user: string = "coinflectJsCChainUser"
  const passwd: string = "coinflectJsP@ssw4rd"
  const key: string =
    "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
  const privateKeyHex: string =
    "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"
  const whaleAddr: string = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
  const xChainAddr: string = "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"

  // test_name        response_promise                            resp_fn          matcher           expected_value/obtained_value
  const tests_spec: any = [
    [
      "createUser",
      () => keystore.createUser(user, passwd),
      (x) => x,
      Matcher.toEqual,
      () => { return {} }
    ],
    [
      "importKey",
      () => cchain.importKey(user, passwd, key),
      (x) => x,
      Matcher.toBe,
      () => whaleAddr
    ],
    [
      "exportCFLT",
      () => cchain.exportCFLT(user, passwd, xChainAddr, new BN(10)),
      (x) => x,
      Matcher.Get,
      () => exportTxHash
    ],
    [
      "getBaseFee",
      () => cchain.getBaseFee(),
      (x) => x,
      Matcher.toBe,
      () => "0x34630b8a00"
    ],
    [
      "getMaxPriorityFeePerGas",
      () => cchain.getMaxPriorityFeePerGas(),
      (x) => x,
      Matcher.toBe,
      () => "0x0"
    ],
    [
      "exportKey",
      () => cchain.exportKey(user, passwd, whaleAddr),
      (x) => x,
      Matcher.toEqual,
      () => ({
        privateKey: key,
        privateKeyHex: privateKeyHex
      })
    ]
  ]

  createTests(tests_spec)
})