import {expect} from "chai"
import parseKey from "../../lib/helpers/parseKey";



describe("parseKey()",function(){
  it("Parse a package key to its components",function(){
    var input = "Pamd64 holusion-controller 2.0.0 d9d048e84404c64f"
    var res = parseKey(input);

    expect(res).to.deep.equal({
      name:"holusion-controller",
      arch:"amd64",
      version:"2.0.0",
      key:input
    })
  })
})
