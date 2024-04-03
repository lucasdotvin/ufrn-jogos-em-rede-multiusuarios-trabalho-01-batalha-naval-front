<h1 align="center">Navall.io - Front</h1>

<p align="center">
<a href="https://www.metropoledigital.ufrn.br/portal/"><img alt="UFRN - IMD" src="https://img.shields.io/badge/ufrn-imd-ufrn?style=for-the-badge&labelColor=%23164194&color=%230095DB&link=https%3A%2F%2Fwww.metropoledigital.ufrn.br%2Fportal%2F"></a>
<br>
<a href="https://vuejs.org/"><img alt="Vue.js" src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"></a>
</p>

Cliente, desenvolvido com Vue.js e Tailwind CSS, para o jogo Navall.io, um projeto da disciplina de Jogos em Rede Multiusuários.

## Iniciando

Essas instruções lhe darão uma cópia do projeto e um caminho para executá-lo localmente para fins de desenvolvimento e teste.

### Pré-Requisitos

Esse projeto requer uma instalação funcional do toolkit [Bun](https://bun.sh/).

#### Instalação

Para instalar as dependências, basta rodar:

```sh
bun install
```

#### Variáveis de Ambiente

Antes de executar o projeto, é necessário fornecer as variáveis de ambiente adequadas. Existe um arquivo `.env.example` na raiz do repositório com exemplos de valores. Copie o arquivo para o destino `.env`:

```sh
cp .env.example .env
```

Em seguida, edite o arquivo para preencher as variáveis de ambiente:

- `VITE_API_URL`: essa variável indica o endereço da API do backend. Em ambiente de desenvolvimento, você pode deixá-la com a mesma localidade do front, pois o Vite fará proxy automaticamente das chamadas em `/api` para o endereço `http://localhost:8080`
- `VITE_WEBSOCKET_URL`: esse campo define o endereço do backend para as conexões de WebSocket. Em ambientes Linux, você pode passar o mesmo endereço do back (`http://localhost:8080`). Entretanto, ao rodar no WSL, é preciso identificar o IP recebido pela máquina virtual Linux, [como descrito aqui](https://github.com/postmanlabs/postman-app-support/issues/11204#issuecomment-1497929455), e usá-lo na configuração.

#### Execução

Para rodar o projeto, basta executar o seguinte comando:

```sh
bun dev
```

## Licença

Esse projeto é distribuído sob a Licença MIT. Leia o arquivo [LICENSE](LICENSE) para ter mais detalhes.
