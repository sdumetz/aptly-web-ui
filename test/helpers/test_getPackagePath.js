'use strict';
import {expect} from "chai"
import getPackagePath from "../../lib/helpers/getPackagePath";



describe("parseKey()",function(){
  it("Parse a package's URL from its name",function(){
    var input = "aptly_0.8_amd64.deb"
    var res = getPackagePath("extras", input);
    expect(res).to.equal("/pool/extras/a/aptly/aptly_0.8_amd64.deb")
  })
  it("Uppercases gets downcased",function(){
    var input = "FoO_0.8_amd64.deb"
    var res = getPackagePath("extras", input);
    expect(res).to.equal("/pool/extras/f/foo/FoO_0.8_amd64.deb")
  })
})
