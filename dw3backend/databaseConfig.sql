create table IF NOT EXISTS vendedores (
    vendedorid bigserial constraint pk_vendedor PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    nome VARCHAR(60),
    ativo boolean,
    deleted boolean DEFAULT false
);

create table IF NOT EXISTS vendas (
    vendasid bigserial constraint pk_alunos PRIMARY KEY,
    codigodebarras varchar(20) UNIQUE,
    produto varchar(50),
    descricao VARCHAR(60),
    valor numeric(8,2),
    datavenda date,
    vendedorid bigint constraint fk_venda_vendedor REFERENCES vendedores,
    deleted boolean DEFAULT false
);

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

