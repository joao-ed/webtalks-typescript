import { HasEmail } from './basics'

/**
 * Generics permitem você parametrizar tipos da mesma forma que funções parametrizam valores
 *
 */

// o parâmetro determina o valor do argumento
function wrappedValue(x: any) {
    return {
        value: x,
    }
}

// type parameter determina o type de x
interface WrappedValue<X> {
    value: X
}

let val: WrappedValue<string[]> = { value: [] }
val.value

/**
 * Podemos nomear este parâmetro da forma que quisermos, porém a convenção é usar
 * letras maiúsculas começando com 'T'. (uma herança do C++ de "templates" )
 *
 */

/**
 * Types parameters podem ter valores default assim como parâmetros de funções possuem
 */

// for Array.prototype.filter
interface FilterFunction<T = any> {
    (val: T): boolean
}

const stringFilter: FilterFunction<string> = (val) => typeof val === 'string'
stringFilter(0) // Erro, só aceita string
stringFilter('abc') // ok

// agora usando o default type
const truthyFilter: FilterFunction = (val) => val
truthyFilter(0) // false
truthyFilter(1) // true
truthyFilter('') // false
truthyFilter(['abc']) // true

/**
 * Podemos ter constraints em type parameters.
 * No caso abaixo, todos os objetos do array devem possuir a chave id
 */

function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
    const out: { [k: string]: T } = {}
    array.forEach((val) => {
        out[val.id] = val
    })
    return out
}

const myDict = arrayToDict([
    { id: 'a', value: 'first', lisa: 'Huang' },
    { id: 'b', value: 'second' },
    { id: 'c', value: 'third' },
])

/**
 * (5) Type parameters estão também associados a escopo
 */

function startTuple<T>(a: T) {
    return function finishTuple<U>(b: U) {
        return [a, b] as [T, U]
    }
}
const myTuple = startTuple(['first'])(42)
