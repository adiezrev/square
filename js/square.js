const { createApp, ref } = Vue

const vuetify = Vuetify.createVuetify();
const app = createApp({
    setup() {
        //configuracion
        //const size = ref(3);
        //const time = ref(2000);

        const configuration = ref({
            size: 3,
            time: 2000,
            duration: 10000
        });

        //en ejecucion
        const position = ref({
            square: Math.round((configuration.value.size*configuration.value.size)/2),
            row: Math.round(configuration.value.size/2),
            col: Math.round(configuration.value.size/2)
        });
        const status = ref({
            working: false,
            id: null,
            initialTime: 0
        });


        /**
         * Obtiene el Id del cuadrado actual
         * 
         * @param {*} row fila
         * @param {*} col columna
         * @returns id del cuadrado
         */
        function getSquareId(row,col) {
            return ((row-1)*configuration.value.size)+col;
        }

        /**
         * Inicia el ejercicio
         */
        function startStopExercise() {

            status.value.working = !status.value.working;
            if(status.value.working) {
                status.value.id = setInterval(movePosition, configuration.value.time);

                //temporal
                status.value.initialTime = moment('2016-01-01').format(); 

            } else {
                console.log("-->"+status.value.id);
                clearInterval(status.value.id);
            }
        }

        /**
         * function que incrementa el tiempo que se lleva
         */
        function incrementTime() {

        }

        /**
         * Funcion que indica la nueva posicion
         * 
         */
        function movePosition() {
            
            let rowOptions = [];
            let colOptions = [];
            //opciones de row
            if(position.value.row==1) rowOptions.push(1);
            else if(position.value.row==configuration.value.size) rowOptions.push(-1);
            else rowOptions.push(1,-1);

            //opciones de col
            if(position.value.col==1) colOptions.push(1);
            else if(position.value.col==configuration.value.size) colOptions.push(-1);
            else colOptions.push(1,-1);
            
            console.log(position.value);
            //aleatoriamente nos movemos por fila o columna
            if(Math.floor((Math.random())<0.5)) {
                //se mueve lateralmente
                position.value.row = position.value.row + rowOptions[Math.floor((Math.random()*rowOptions.length))];
                console.log("row->"+position.value.row);
            } else {
                //se mueve verticamente
                position.value.col = position.value.col + colOptions[Math.floor((Math.random()*colOptions.length))];
                console.log("col->"+position.value.col);
            }
            position.value.square = getSquareId(position.value.row,position.value.col);

            console.log("ejecutando ... "+position.value.square);            
        }

        return {
          configuration,status,position,getSquareId,startStopExercise
        }
    }
});

app.use(vuetify).mount('#app');