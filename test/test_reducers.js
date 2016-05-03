import {expect} from "chai"
import reducer from "../lib/reducers"
import {initialState} from "../lib/createStore.js"
function assignState(newState){
  return  Object.assign({},initialState,newState)
}
describe("global test",()=>{
  it("return empty initial state",()=>{
    expect(reducer(undefined,{})).to.deep.equal(initialState)
  });
})
describe("uploads",()=>{
  it("UPLOAD_START handle",()=>{
    let finalState = assignState({uploads:{'test_file.txt':{size:25000,progress:0,active:false}}})
    expect(reducer(undefined,{type:'UPLOAD_START',name:"test_file.txt",size:25000})).to.deep.equal(finalState);
  });
  it("UPLOAD_START set progress",()=>{
    let finalState = assignState({uploads:{'test_file.txt':{size:0,progress:true,active:false}}})
    expect(reducer(undefined,{type:'UPLOAD_START',name:"test_file.txt",progress:true})).to.deep.equal(finalState);
  });
  it("UPLOAD_PROGRESS handle",()=>{
    let firstState = assignState({uploads:{'test_file.txt':{size:25000,progress:0,active:false}}})
    let finalState = assignState({uploads:{'test_file.txt':{size:25000,progress:10,active:false}}})
    expect(reducer(firstState,{type:'UPLOAD_PROGRESS',name:"test_file.txt",progress:10})).to.deep.equal(finalState);
  });
  it("UPLOAD_TOGGLE handle",()=>{
    let inactiveState = assignState({uploads:{'test_file.txt':{size:25000,progress:0,active:false}}})
    let activeState = assignState({uploads:{'test_file.txt':{size:25000,progress:0,active:true}}})
    expect(reducer(inactiveState,{type:'UPLOAD_TOGGLE',name:"test_file.txt"})).to.deep.equal(activeState);
    expect(reducer(activeState,{type:'UPLOAD_TOGGLE',name:"test_file.txt"})).to.deep.equal(inactiveState);
  });
  it("UPLOAD_REMOVE handle",()=>{
    let firstState = assignState({uploads:{'test_file.txt':{size:25000,progress:0,active:false}}})
    let finalState = assignState({uploads:{}})
    expect(reducer(firstState,{type:'UPLOAD_REMOVE',name:"test_file.txt"})).to.deep.equal(finalState);
  });
})
