import { HasEmail, HasPhoneNumber } from './basics'

//== FUNÇÕES ==//

// argumentos e retornos podem ter a anotação de tipo
function sendEmail(to: HasEmail): { recipient: string; body: string } {
    return {
        recipient: `${to.name} <${to.email}>`,
        body: 'teste',
    }
}

// arrow function
const sendTextMessage = (
    to: HasPhoneNumber
): { recipient: string; body: string } => {
    return {
        recipient: `${to.name} <${to.phone}>`,
        body: 'teste',
    }
}

// o retorno pode ser inferido
function getNameParts(contact: { name: string }) {
    const parts = contact.name.split(/\s/g) // split @ whitespace
    if (parts.length < 2) {
        throw new Error(
            `Can't calculate name parts from name "${contact.name}"`
        )
    }
    return {
        first: parts[0],
        middle:
            parts.length === 2
                ? undefined
                : // everything except first and last
                  parts.slice(1, parts.length - 2).join(' '),
        last: parts[parts.length - 1],
    }
}

//rest parameters também funciona (deve ser um array)
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0)
console.log(sum(3, 4, 6)) // 13

//multiplas signatures functions
//"overload signatures"
function contactPeople(method: 'email', ...people: HasEmail[]): void
function contactPeople(method: 'phone', ...people: HasPhoneNumber[]): void

//implementação"
function contactPeople(
    method: 'email' | 'phone',
    ...people: (HasEmail | HasPhoneNumber)[]
): void {
    if (method === 'email') (people as HasEmail[]).forEach(sendEmail)
    else (people as HasPhoneNumber[]).forEach(sendTextMessage)
}

//email ok
contactPeople('email', { name: 'foo', email: '' })

//telefone ok também
contactPeople('phone', { name: 'foo', phone: 12345678 })

//desta forma não funciona
contactPeople('email', { name: 'foo', phone: 12345678 })

export default {}
