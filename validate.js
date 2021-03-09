/* eslint-disable */
// validate phone number
export const validatePhoneNum = (rule, value, callback) => {
    const patt = /^1[3456789]\d{9}$/;
    if (!value) {
        if (rule.required) {
            callback(new Error("手机号码不能为空"));
        } else {
            callback();
        }

    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确格式的手机号码"));
    }
};

// validate email
export const validateEmail = (rule, value, callback) => {
    const patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // const patt = /^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/;
    if (!value) {
        if (rule.required) {
            callback(new Error("请输入正确的邮箱地址"));
        } else {
            callback();
        }

    }
    if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请输入正确的邮箱地址"));
    }
};

// validate email address
export const validateEmailAddress = (rule, value, callback) => {
    const patt = /^([a-z0-9A-Z]+[-|_|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;

    if (!value) {
        if (rule.required) {
            callback(new Error("请输入正确的邮箱地址"));
        } else {
            callback();
        }

    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请输入正确的邮箱地址"));
    }
};

// validate verification code
export const validateVerificationCode = (rule, value, callback) => {
    if (!value) {
        if (rule.required) {
            callback(new Error("验证码不能为空"));
        } else {
            callback();
        }

    } else if (value.toString().length === 6) {
        callback();
    } else {
        callback(new Error("请填写正确的验证码信息"));
    }
};

// validate verification code
export const validateRealName = (rule, value, callback) => {
    const patt = /^[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/;
    // const patt = /[^\u4e00-\u9fa5]/; // 只能输入中文
    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }

    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error(""));
    }
};

// validate 中文名
export const validateChainName = (rule, value, callback) => {
    const patt = /^[\u4e00-\u9fa5]{1,50}$/;
    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }

    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确的中文信息"));
    }
};

// validate 
export const validateMoney = (rule, value, callback) => {
    const patt = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确金额"));
    }
};

// validate 正则表达式同时验证手机号和座机号
export const validatePhoneOrMobile = (rule, value, callback) => {
    const patt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;

    if (!value) {
        if (rule.required) {
            callback(new Error("请填写正确手机号或固定电话,例如13000000000/0551-65654455"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                "请填写正确手机号或固定电话,例如13000000000/0551-65654455"
            )
        );
    }
};

// validate 正则表达式同时验证手机号和座机号
export const validatePhoneOrMobileNorequire = (rule, value, callback) => {
    const patt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;

    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(
            new Error(
                "请填写正确手机号或固定电话,例如13000000000/0551-65654455"
            )
        );
    }
};

// validate 银行卡号
export const validateBankcardNum = (rule, value, callback) => {
    const patt = /^([1-9]{1})(\d{14}|\d{18})$/;

    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确银行卡号"));
    }
};

// validate 身份证
export const validateIdcardNum = (rule, value, callback) => {
    const patt = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确身份证号"));
    }
};

/**
 *  validate 版本号 
验证版本号的正则表达式，
要求，必须是三位，x.x.x的形式，
每位x的范围分别为1-99,0-99,0-99。
不允许的情况0.x.x；01.x.x; x.0x.x; x.00.x； x.x.00; x.x.0x
 */
export const validateVersion = (rule, value, callback) => {
    const patt = /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/;
    if (!value) {
        if (rule.required) {
            callback(new Error("请输入"));
        } else {
            callback();
        }
    } else if (patt.test(value)) {
        callback();
    } else {
        callback(new Error("请填写正确版本号"));
    }
};