import { Coinflect } from "coinflect/dist"
import { IndexAPI } from "coinflect/dist/apis/index"
import { GetContainerByIndexResponse } from "coinflect/dist/apis/index/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const index: IndexAPI = coinflect.Index()

const main = async (): Promise<any> => {
  const idx: string = "0"
  const encoding: string = "hex"
  const baseurl: string = "/ext/index/X/tx"
  const containerByIndex: GetContainerByIndexResponse =
    await index.getContainerByIndex(idx, encoding, baseurl)
  console.log(containerByIndex)
}

main()
