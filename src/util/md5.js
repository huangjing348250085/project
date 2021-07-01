import md5 from 'js-md5'
function strtomd5(str){
    return md5(md5(str).split('').reverse().join(''))
}
export {
strtomd5
}