(function (factory) {
    
    'use strict'

    document.addEventListener('DOMContentLoaded', () => {
        factory().init()
    })
    
}(function () {

    'use strict'

    // Elementos DOM
    let canvas = selector('#maker-canvas'),
        url = selector('#m-url'),
        top_text = selector('#m-topt'),
        bottom_text = selector('#m-bott'),
        container = selector('.maker-view > .content'),
        meme_download = selector('.m-download')

    // Elementos internos
    let canvas_context = canvas.getContext('2d'),
        meme_image = new Image(),
        middle = {x: 0, y: 0},
        meme_font_s = 2.5
    
        // Constantes
    const meme_font = 'Impact'
          

    /**
     * Função que inicaliza a aplicação
     */
    function init () {

        // setBasis()
        loadEvents()

    }


    /**
     * Função que carrega os eventos para os elementos DOM
     */
    function loadEvents () {

        bind(url, 'input', event => {
            meme_image.setAttribute('src', event.target.value)
        })

        bind(meme_image, 'load', () => {
            let ratio = 0
            let wp = meme_image.width / container.clientWidth
            let hp = meme_image.height / container.clientHeight
            let nw = 0
            let nh = 0
            if (wp > hp) {
                ratio = meme_image.height / meme_image.width
                nw = container.clientWidth
                nh = container.clientWidth * ratio
            } else {
                ratio = meme_image.width / meme_image.height
                nw = container.clientHeight * ratio
                nh = container.clientHeight
            }
            canvas.width = nw
            canvas.height = nh
            drawMemeImage()
            middle.x = Math.ceil(nw/2)
            middle.y = Math.ceil(nh/2)
            drawMemeText(top_text.value.toUpperCase(), {x: middle.x, y: 50})
            drawMemeText(bottom_text.value.toUpperCase(), {x: middle.x, y: canvas.height-10}, 'bottom')
        })

        bind(top_text, 'input', event => {
            drawMemeImage()
            drawMemeText(event.target.value.toUpperCase(), {
                x: middle.x,
                y: 50
            })
            drawMemeText(bottom_text.value.toUpperCase(), {x: middle.x, y: canvas.height-10}, 'bottom')
        })

        bind(bottom_text, 'input', event => {
            drawMemeImage()
            drawMemeText(top_text.value.toUpperCase(), {x: middle.x, y: 50})
            drawMemeText(event.target.value.toUpperCase(), {
                x: middle.x,
                y: canvas.height-10
            }, 'bottom')
        })

        meme_download.onclick = () => {
            // console.log(this)
            let image = canvas.toDataURL('image/png')
            meme_download.href = image
        }

    }

    /**
     * Função para desenhar a imagem da url no canvas
     */
    function drawMemeImage () {

        canvas_context.clearRect(0, 0, canvas.width, canvas.height)
        canvas_context.drawImage(meme_image, 0, 0, canvas.width, canvas.height)

    }

    /**
     * Função para colocar o texto digitado nos campos para a imagem
     * 
     * @param {string} text Texto que o usuário quer que apareça
     * @param {object} coord Ojeto contento dois atributos para as coordenadas X e Y
     * @param {string} [pos] posição do texto, se está em cima ou em baixo
     */
    function drawMemeText (text, coord, pos = 'top') {
        
        let offsetY = coord.y
        let height = meme_font_s * 16
        let lines = text.split('\n')

        if (pos === 'bottom')
            offsetY -=  lines.length * height

        canvas_context.strokeStyle = '#000'
        canvas_context.fillStyle = `#fff`
        canvas_context.textBaseline = (pos === 'top') ? 'bottom' : 'top'
        canvas_context.font = `${height}px ${meme_font}`
        canvas_context.textAlign = 'center'

        lines.forEach(line => {
            canvas_context.fillText(line, coord.x, offsetY)
            canvas_context.strokeText(line, coord.x, offsetY)
            offsetY += height
        })

    }

    /**
     * Função para vincular um função callback por meio de um evento
     * 
     * @param {Element} element elemento onde será vinculado o listener
     * @param {string} event nome do tipo do evento ao qual se quer vincular
     * @param {function} callback função de retorno para ser executado ao evento
     * @returns {Element}
     */
    function bind (element, event, callback) {
            element.addEventListener(event, callback)
    }

    /**
     * Função de seleção de elementos do documento por meio de querys
     * 
     * @param {string} query Query do elemento ao qual se quer selecionar
     * @returns {Element}
     * @returns {null}
     */
    function selector (query) {
        return document.querySelector(query)
    }

    // Retorno do método de inicialização
    return {
        init: init
    }

}))