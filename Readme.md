# 🚀 API de Geração de Texto com IA

Bem-vindo(a) ao repositório da nossa API de Geração de Texto com IA! Esta API utiliza modelos avançados de linguagem para gerar conteúdo dinâmico e relevante, otimizando a integração com seus sistemas e bancos de dados.

---

# Meu Projeto

> **🚧 AVISO: Em Construção! 🚧**
> Este projeto está ativamente em desenvolvimento. Conteúdo e funcionalidades podem ser alterados a qualquer momento.

---

## ⚡ Exemplo de Resposta da API

Ao fazer uma requisição à API, você receberá uma resposta detalhada como a seguinte:

{
  "message": [
    {
      "produtos": [
        "Aveia",
        "Maçã",
        "Banana"
      ]
    }
  ]
}

---

## Sobre o que são Saídas Estruturadas
Utilizando ferramentas como **JSONMode** e **StructuredOutputs**, para facilitar integração com banco de dados.

---

## Function Calling

Estruturei de o modelo verificar a instrução do usuário, e com isso decidir qual método ele deveria chamar para executar o que o usuário precisava, por exemplo:

**has_stock** e **empty_stock**: ele pode validar os produtos se estão em estoque de acordo com a necessidade dele ou não, e depois chamamos o modelo novamente para estruturar a resposta de acordo com o que foi pedido pelo o usuário depois de validar no mock de "banco que criamos".

