<div align="center">

# Planium-test Challenge

Esse repositório se trata do teste técnico para empresa Bitix/Planium.

</div>

## Tecnologias usadas:
- Backend:
  - NodeJS;
  - NestJs.
- Frontend:
  - React;
  - Biblioteca MUI.

## Deploys:
- Frontend: https://planium-front.vercel.app/
- Backend: https://planium-api-test.herokuapp.com/plans

## Case do projeto:

<img src="https://www.planium.io/wordpress/wp-content/uploads/2018/11/logo-Planium-06.svg" width="250" height="100">
**[Especificações para o teste]**

**Observações:**
  - "Plano" dito aqui significa "Plano de Saúde".
  - "Beneficiários" são as pessoas participantes/pagantes de um plano de saúde.


1. Você recebeu duas tabelas em JSON(presente nesse repositório), uma de Planos e outra de Preços.
	- A tabela de plano possui os planos que serão vendidos.
	- A tabela de preço possui o(s) preço(s) para cada plano listado na tabela de planos.


2. Cada plano tem três faixas de preços, sendo estas categorizadas por idade:
	- Pessoas de 0 a 17 anos vão para a faixa1.
	- Pessoas de 18 a 40 anos vão para a faixa2.
	- Pessoas com mais de 40 anos vão para a faixa3.


3. Cada plano pode ter preços variados dependendo da quantidade de pessoas participando do mesmo.
	- Essa variação é representada na tabela de preços pela coluna "minimo_vidas".


4. Com as especificações acima, faça uma API que permita a entrada dos seguintes dados, salvando-os em um Json chamado beneficiarios.json:
    - Quantidade de beneficiários
    - Idade de cada beneficiário
    - Nome de cada beneficiário
    - Registro do plano escolhido (deve ser um dos registros listados na tabela de plano)
      - Caso o usuário liste um registro inexistente, deve mostrar mensagem de erro.


5. Essa API deverá ler a tabela de Plano e a tabela de Preço, e retornar:
    - Preço de cada beneficiário para o plano escolhido, juntamente com a sua idade.
    - O preço total do Plano escolhido (soma do preço de cada beneficiário)
	
6. Ao final, unir todas as informações e salvar em um JSON chamado proposta.json, o mesmo deverá conter todas as informações sobre os beneficiarios, planos e preços.
    - **Observações:**
    Seu **back-end** deverá ser feita utilizando PHP ou Node.js
    Criar um front-end pra consumir essas informações, fique a vontade para utilizar a ferramenta/framework que quiser.

7. Ao término, dê reply no e-mail que você originalmente recebeu com o link do seu repositório no [GitHub](https://github.com/).
  - Tempo total: 5 dias após o envio do teste.


**Good luck and have fun :)**

## Instruções de uso para API localmente:
- Clone o repositório em sua máquina;
- Acesse a pasta `/planium-api`;
- Instale as dependencias com o comando `npm install`;
- Utilize o comando `npm start` para iniciar a aplicação;
- Aplicação utilizará a porta `3001` do localhost.
 API possui as seguintes rotas:
    - POST: `/plans/beneficiaries`
    - GET `/plans/proposal`

#### POST `/plans/beneficiaries`:
- API permite que seja criado um novo cadastro de beneficiario através do método POST no endpoint `/plans/beneficiaries` passando no body um json no formato:
```json
    {
      "beneficiariesData": [
        {
          "name": "String com no minimo 3 caracteres",
          "age:" "Numero igual/maior que 0",
        }
      ],
      "chosenPlan": "Numero referente ao codigo do plano selecionado",
    }
```
#### GET `/plans/proposal`:
- API permite que seja possivel listar a proposta cadastrada através dp método GET no endpoint `/plans/proposal`.

## Instruções de uso para o Frontend localmente:
- Clone o repositório em sua máquina;
- Acesse a pasta `/planium-front`;
- Instale as dependencias com o comando `npm install`;
- Utilize o comando `npm start` para iniciar a aplicação;
- Aplicação utilizará a porta `3000` do localhost;
- O front já está integrado com o backend.
- O frontend possui 2 rotas:
  - `/register-beneficiaries`, onde é possível cadastrar novos registros;
  - `/list-proposal`, onde listará todos os registros cadastrados;

## Próximos passos no projeto:
- Aprimoramento nos teste;
- Testes no frontend;
- Implementação de algum banco de dados.

### Considerações finais:
  Dúvidas ou sugestões me contate por:
  - Linkedin: https://www.linkedin.com/in/guicouto90/
  - Email: gui.couto90@yahoo.com.br