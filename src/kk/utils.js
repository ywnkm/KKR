
export const delay = ms => {
    if (typeof ms !== 'number') {
        throw new Error('ms must be a number')
    }
    if (ms <= 0) {
        return Promise.resolve()
    } else {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export function toString(obj) {
    if (!obj) {
        return 'undefined'
    }
    return obj.toString()
}