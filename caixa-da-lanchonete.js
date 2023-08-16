const tabelaPreco = {
    "cafe": 3.00,
    "chantily" : 1.50,
    "suco": 6.20,
    "sanduiche": 6.50,
    "queijo": 2.00,
    "salgado": 7.25,
    "combo1": 9.50,
    "combo2": 7.50
};

class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {

        if(['dinheiro','debito','credito'].indexOf(metodoDePagamento) === -1){
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
          }

        var total = 0.0;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            
            if (parseInt(quantidade) <= 0) {
                return 'Quantidade inválida!';
              }

            if(['cafe','chantily','suco','sanduiche','queijo','salgado','combo1','combo2'].indexOf(codigo) === -1){
                return 'Item inválido!';
            }

            if(codigo === 'chantily'){
                const existItem = itens.some(item => item.startsWith('cafe,'));
                if(!existItem){
                    return 'Item extra não pode ser pedido sem o principal'
                }
            }

            if(codigo === 'queijo'){
                const existItem = itens.some(item => item.startsWith('sanduiche,'));
                if(!existItem){
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }

            total = total + (tabelaPreco[codigo] * parseInt(quantidade));
        }

        if(metodoDePagamento === 'dinheiro'){
            total = total - ((5*total)/100);
        }else if(metodoDePagamento === 'credito'){
            total =  total + ((3*total)/100);
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

}
