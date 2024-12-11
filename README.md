<h1>SMART CITY</h1>

projeto escolar feito com o objetivo de aprender sobre react, django e a junção entre eles, junto com o SENAI.

<p>primeiro o repositório deve ser clonado para a utilização</p>

```bash
git clone https://github.com/Emoreno07/integrador.git
cd integrador
```
<h2>SETUP - front</h2>

```bash

cd smartcityfe 
npm i 
npm run dev
```

<h2>SETUP - back</h2>
<p>desde o diretório integrador</p>

```bash
cd smart_city
```
<p>crie uma env, acesse-a e instale os pacotes no diretório smart_city</p>

```bash
pip install -r requirements.txt
```

<p>coloque os dados</p>

```bash
py manage.py migrate
py load_csv.py
py load_temperatura.py
py load_contador.py
py load_umidade.py
py load_luminosidade.py
```
<p>rode o servidor, ainda no diretório smart_city</p>

```bash
py manage.py runserver
```

<p>Note: o servidor deve ser feito primeiro para o site funcionar O.o</p>

<h2>O que o smart city faz?</h2>

<p>foi desenvolvido com objetivo de mostrar os dados de sensores, analisar esses dados e transformá-los em gráficos que mostram as informações atualizadas e recentes(classificadas por dias e por horas) , alem de poder gerenciar e criar novos sensores, permite a classificação deles</p>
