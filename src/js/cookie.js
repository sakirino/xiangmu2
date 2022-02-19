const cookie = {
    set(key, value, days) {
        let date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = `${key}=${value};expires=${date};path=/`;
    },
    get(key) {
        let arr = document.cookie.split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    },
    del(key) {
        this.set(key, '', -1);
    }
};