# upload.video

Stack: Node.js, Fastify, Prisma, Cloudflare R2

## Features (rotas)

- [x] Criação de usuário
- [x] Login de usuário
- [ ] Update perfil do usuário
- [x] Upload de arquivos no Cloudflare
- [x] Download de arquivos do cloudflare
- [x] Listar todos os arquivos do usuário
- [ ] Excluir os arquivos do usuário

## Requisitos

### Requisitos Funcionais (RFs):
- [ ] O usuário pode realizar novos uploads;
- [ ] O usuário pode visualizar os últimos uploads realizados;

### Regras de Negócio (RNs):
- [ ] Os uploads devem ser expirados automaticamente após 14 dias;
- [ ] Só deve ser possível visualizar uploads não expirados;
- [ ] Só deve ser possível realizar upload de arquivos com o padrão (mp4) correto;
- [ ] Só deve ser possível upload de arquivos até 1gb cada;

### Requisitos Não Funcionais (RNFs):
- [ ] Os links para compartilhamento devem ser assinados evitando acesso público;

## Importante

### Mime Types

```ts
const bannerMimeTypes = [
  '.exe', // (executáveis)
	'.dll', // (bibliotecas dinâmicas)
	'.bat', // (arquivos de lote)
	'.cmd', // (arquivos de comando)
	'.sh' , // (scripts shell)
	'.cgi', // (scripts CGI)
	'.jar', // (arquivos Java)
];
```