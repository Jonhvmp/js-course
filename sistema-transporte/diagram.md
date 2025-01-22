# Modelagem de Dados - Sistema de Transporte Público

## Entidades e Relacionamentos

### 1. Linhas de Transporte
- **id** (PK)
- **nome**
- **tipo** (ônibus, metrô, trem)
- **horário de funcionamento**
- **Relacionamentos:**
  - Uma linha pode ter várias paradas (1:N)
  - Uma linha pode ter vários veículos (1:N)
  - Um motorista pode operar várias linhas (N:M)

---

### 2. Paradas/Estações
- **id** (PK)
- **nome**
- **localização** (endereço ou coordenadas)
- **tipo** (parada de ônibus, estação de metrô, etc.)
- **Relacionamentos:**
  - Uma parada pode pertencer a várias linhas (N:M)
  - Uma parada pode estar presente em várias viagens (N:M)

---

### 3. Veículos
- **placa** (PK)
- **tipo** (ônibus, vagão de trem, etc.)
- **capacidade máxima**
- **linha_id** (FK)
- **Relacionamentos:**
  - Um veículo pertence a uma linha (N:1)
  - Um veículo pode ser utilizado em várias viagens (1:N)

---

### 4. Motoristas/Condutores
- **id** (PK)
- **nome completo**
- **CPF** (único)
- **Relacionamentos:**
  - Um motorista pode operar várias linhas (N:M)
  - Um motorista pode realizar várias viagens (1:N)

---

### 5. Histórico de Viagens
- **id** (PK)
- **linha_id** (FK)
- **veículo_placa** (FK)
- **motorista_id** (FK)
- **data e hora de início**
- **data e hora de fim**
- **Relacionamentos:**
  - Uma viagem está associada a uma linha, veículo e motorista (1:1)
  - Uma viagem pode atender várias paradas (N:M)

---

## Relacionamentos

- **Linha de Transporte** (1) ↔ (N) **Paradas/Estações**
- **Linha de Transporte** (1) ↔ (N) **Veículos**
- **Motoristas** (N) ↔ (M) **Linhas de Transporte**
- **Histórico de Viagens** (1) ↔ (N) **Paradas**
