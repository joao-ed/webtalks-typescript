import { HasEmail } from './basics'

//== TOP TYPES ==//

/// São tipos que podem armazenar qualquer valor. Em typescript temos dois.
let myAny: any = 32
let myUnknown: unknown = 'hello, unknown'

// Veja que podemos fazer o que quiser com any, mas com unknown, não.
myAny.foo.bar.baz
myUnknown.foo

/** ANY
 * é uma boa ideia usar any quando queremos a mesma flexibilidade que o javascript tem com tipos
 * exemplo: as vezes Promise<any> é uma boa quando não nos importamos com o valor a ser resolvido.
 */
async function logWhenResolved(p: Promise<any>) {
    const val = await p
    console.log('Resolved to: ', val)
}

/**
 * UNKNOWN
 * Vejo que é uma boa usar este quando não queremos que este valor jogue pelas regras do javascript.
 * Ele ainda pode armazenar qualquer valor, mas me obriga usar um guard para dizer que, naquele momento, ele é um valor específico.
 *
 *
 */

if (typeof myUnknown === 'string') {
    myUnknown.split(', ') // ok
}

myUnknown.split(', ') // erro

/**
 * type guards
 */
if (typeof myUnknown === 'string') {
    // aqui é uma string
    myUnknown.split(', ') // ✅ OK
}
if (myUnknown instanceof Promise) {
    // aqui é uma promise do tipo any Promise<any>
    myUnknown.then((x: any) => console.log(x))
}

/**
 * criando nossos próprios type guards
 */

// leia como uma pergunta, o argumento "x" é do tipo "y" ?
function isHasEmail(x: any): x is HasEmail {
    return x.name === 'string' && typeof x.email === 'string'
}

// e podemos usá-los assim
if (isHasEmail(myUnknown)) {
    // aqui garantimos que é do tipo hasEmail
    console.log(myUnknown.name, myUnknown.email)
}

// guard fazendo uso de um type parameter para saber se dado argumento é undefined ou não
function isDefined<T>(arg: T | undefined): arg is T {
    return typeof arg !== 'undefined'
}

//== BOTTOM TYPE ==//

/**
 * Bottom type não pode ser usado para armazenar nenhum valor. Em typescript, chamamos ele de "never"
 */
let n: never = 4

/**
 * Você pode se deparar com never ao ir "afunilando" demais
 */

let x = 'abc' as string | number

if (typeof x === 'string') {
    // x aqui é string
    x.split(', ')
} else if (typeof x === 'number') {
    // x aqui é number
    x.toFixed(2)
} else {
    // x aqui é never!
}
