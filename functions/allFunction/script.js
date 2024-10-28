/* Funcoes ou metodos no Js */

let titulo = document.querySelector('h1')
// titulo.textContent = 'Funções no JS'
let box = document.querySelectorAll('box')

/* Funcoes sem parametros e sem retorno (procedure) */
function olaMundo() {
    document.write('Olá Mundo sem retorno<br>')
}

/* Funcoes sem parametros e com retorno (function) */
function olaMundo2() {
    return 'Olá Mundo com retorno<br>'
}
















// CHAMAR A FUNCAO = executar ela
// olaMundo()
// document.write(olaMundo2())

// let x = 2
// let y = 1
// let mensagem = 'Mensagem Sucesso.'

/* Funcoes com parametros e sem retorno  (procedure) */
// function somar(a, b) {
//     document.write((a + b) + "<br>")
// }

/* Funcoes com parametros e com retorno  (function) */
// function somar2(c, d) {
//     return c + d
// }

// CHAMAR A FUNCAO = executar ela
// somar(x, y)
// somar(10, 5)

// document.write(`<p>${somar2(x, y)}</p>`)
// document.write(`<p>${somar2(5, 2)}</p>`)

/* funcao anonima = nao tem nome
pode ou nao ter parametros
pode ou nao ter retorno
*/

// titulo.addEventListener('click', function () {
//     console.log('Clicou no título')
// })

/* Arrow Functions ES6 2015 em diante */

// const olaMundoArrow = () => document.write("Olá mundo!!!!!!!!")

// nao precisa usar a palavra return
// nao se usa nome na funcao
// nao precisa colocar { } se for so uma instrucao

// const olaMundo2Arrow = () => '<p>Olá mundo com arrow function</p>'

// olaMundoArrow()
// document.write(olaMundo2Arrow())
