/**
  * @Author uu
  * @Date 2023-09-06
  * @remark 公共方法
 */
// 随机数生成方法
const createRandom = (minnum,maxnum)=>{
	return Math.floor(Math.random()*(maxnum - minnum+1))+minnum
}

export default {
  createRandom:createRandom
}