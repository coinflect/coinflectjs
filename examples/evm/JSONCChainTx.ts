import { Coinflect, Buffer } from "../../src"
import { EVMAPI, Tx } from "../../src/apis/evm"

const ip: string = "api.coinflect.com"
const port: number = 443
const protocol: string = "https"
const networkID: number = 1
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const cchain: EVMAPI = coinflect.CChain()

const main = async (): Promise<any> => {
  const txID: string = "2jfJtniC8MpnCZTAVo4snyepds33MBGB4Yf1QiPjhCeRYv7gZ5"
  const hex: string = await cchain.getAtomicTx(txID)
  const buf: Buffer = new Buffer(hex.slice(2), "hex")
  const tx: Tx = new Tx()
  tx.fromBuffer(buf)
  const jsonStr: string = JSON.stringify(tx)
  console.log(jsonStr)
  const jsn: Object = JSON.parse(jsonStr)
  console.log(jsn)
}

main()
