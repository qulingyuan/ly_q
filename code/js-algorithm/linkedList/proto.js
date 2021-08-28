const instanceOf = (A,B)=>{
    const p = A;
    while(p){
        if(A === B.prototype){
            return true;
        }
        p = p.__proto__;
    }
    return false;
}
