class Methods{
    /**
     * 生成number个随机的大写字母
     * @param {*} number 
     */
    GetRanLetterString(number) {
        var result = "";
        for (var i = 0; i < number; i++) {
          result += String.fromCharCode(65 + this.GetRanNum());
        }
        return result;
      }
      /**
       * 获取一个0-25的随机数
       */
      GetRanNum() {
        var ranNum;
        for (var i = 0; i < 4; i++) {
          ranNum = Math.ceil(Math.random() * 25);
        }
        return Number(ranNum);
      }

}
export default new Methods()