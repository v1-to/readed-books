# Avisos

- Este projeto tem como objetivo ser uma Proof of Concept (Prova de Conceito) para o estudo e o aprimoramento de técnicas de construção de APIs.
- A arquitetura dessa API não tem o intuito de ser o mais otimizada possível (uma vez que desde o início defini um Overengineering desnecessário para uma regra de negócio tão simples) mas sim o de empregar novas técnicas e experimentação da interoperabilidade entre as tecnologias.
- Cerca de 80 a 85% das tecnologias e técnicas utilizadas nesse projeto eu não tinha conhecimento aprofundado ou sequer tinha algum conhecimento no momento de start.
- Dentro de cada subprojeto teremos outros READMEs com outras explicações dentro de seus respectivos contextos.

# Motivos para as escolhas

## Porque usar monorepo ?

- Facilidade de encontrar trechos de código de outros microservices
- Possibilidade de reutilização de código com bibliotecas compartilhadas dentro do projeto
- De forma orgânica ao fazer um pull da base de código as versões dos microservices são atualizadas para a mais recente

## Porque usar microservices ?

- Simplificação do escopo e responsabilidade de cada item (fuga do modelo monolítico)
- Modelo distribuído é ideal para trabalho entre diversos times e times remotos
- Em alguns casos é possível ter um ganho de performance quando trazendo dados ou efetuando operações

## Porque usar gRPC nos microservices ?

- Multiplataforma permite escalar adotando novas (e diferentes) tecnologias para novos futuros serviços, migrando a base de código de forma orgânica
- Maior velocidade e menor latência na comunicação entre os microservices
- Produtividade e uso facilitados ao se definir os protobuffers (não é necessário definir longas e extensas rotas e seus métodos como no REST)

## Porque usar mensageria ?

- Tarefas assíncronas que não precisam de um response tornam-se mais otimizadas nesse modelo
- Seguindo o modelo Pub/Sub o serviço que consome as publicações pode trabalhar de forma mais independente e isolada, precisando apenas da entrada de novos dados para a sua execução
- Uma vez que tenhamos a escrita em disco das entradas podemos ter um melhor tratamento de erros e tolerância a falhas

## Porque usar RabbitMQ na mensageria ?

- Multiplataforma
- Popularidade e consolidação frente ao mercado
- Simplicidade e leveza em comparação a alguns concorrentes
