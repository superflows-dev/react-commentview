const Util = {

    ellipsizeStart: function (str, maxLength) {
        if (str.length > maxLength) {
            return "..." + str.slice(-(maxLength - 3));
        }
        return str;
    },

    getWindowDimensions: function () {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

}

export {Util};