// o básico mas não menos importante

///==== VARIAVEIS ====///
// como podemos dizer que uma determinada variável é de um determinado tipo ?
// há algumas formas...
// 1- inferência do tipo
let name = 'Indiana Jones'
name = 20 // ops, tipagem estática! nasceu string morre string

// 2- "type annotation". Não possuímos um inicializador, mas dizemos que aquela variável só pode ser do tipo number
let age: number
age = '23' //ops, string não

// const é muuuito específico
const grandma = 'Valkiria'

///==== ARRAYS ====///
// inferência
let heroes = ['Chapolin colorado']

/// never ?????
// let villains = []
// villains[0] = 'Riacho Molhado'

// any ????
let stuffs: any[] = [
    1,
    'string',
    (func: (x: string) => string) => (x: string) => func(x),
    true,
    { name: 'Julian Casablancas' },
]
const ages = [1]
ages.push(34)
ages.push(98)
ages.push('12')

// tupla (um array com tamanho pré definido)
// usamos muito principalmente criando nossos custom hooks em react
let address: [number, string, string, number] = [
    123,
    'Rua xyz',
    'Araçatuba, SP',
    16012515,
]

///==== OBJETOS ====///

// inferencia
const customer = { id: 'xxxxx', name: 'joao' }

// definindo o tipo
let customer_: { id: string; name: string }

customer_ = {
    id: 'dsfrere',
    name: 'joao',
}

// posso criar uma interface para poder reaproveitar caso haja necessidade
interface Customer {
    id: string
    name: string
}

///==== UNIAO E INTERSECÇÃO ====///

export interface HasPhoneNumber {
    name: string
    phone: number
}

export interface HasEmail {
    name: string
    email: string
}

// UNIÃO
let contactInfo: HasEmail | HasPhoneNumber =
    Math.random() > 0.5
        ? {
              // HasPhoneNumber
              name: 'João',
              phone: 18996341384,
          }
        : {
              // HasEmail
              name: 'João',
              email: 'jdsilva@stone.com.br',
          }

contactInfo.name // só podemos acessar as propriedades que temos em comum

// INTERSECCÇAO
let otherContactInfo: HasEmail & HasPhoneNumber = {
    // precisamos inicializar com todas as propriedades presentes nas interfaces "HasEmail" e "HasPhoneNumber"
    name: 'Johanes',
    email: 'jdsilva@stone.com.br',
    phone: 18996341384,
}

// agora podemos acessar todas as propriedades em "HasEmail" & "HasPhoneNumber"
otherContactInfo.name
otherContactInfo.email
otherContactInfo.phone

// type unknown ???
// preciso usar typeguard
const what: unknown = {
    name: 'xxx',
    age: 'yyy',
}

what.name
