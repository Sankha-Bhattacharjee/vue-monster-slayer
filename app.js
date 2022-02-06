function getRandomValue(min,max){
    return Math.floor(Math.random()*(max - min) + min);
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[]
        }
    },
    watch:{
        playerHealth(value){
            if(value <=0 && this.monsterHealth<=0){
                //draw
                this.winner='draw';
            }else if(value <=0){
                //monster won
                this.winner='monster';
            }
        },
        monsterHealth(value){
            if(value <=0 && this.playerHealth<=0){
                //draw
                this.winner='draw';
            }else if(value <=0){
                //player won
                this.winner='player';
            }
        }
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width:'0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpcialAttack(){
            //console.log(this.currentRound);
            if(this.currentRound % 3 !== 0){
                return true;
            }
            return false;
        }
    },
    methods:{
        startGame(){
            this.playerHealth=100;
            this.monsterHealth=100;
            this.currentRound=0;
            this.winner=null;
            this.logMessages=[];
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,10);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(7,15);
            this.addLogMessages('monster','attack',attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttak(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(10,20);
            this.playerHealth += healValue;
            if(this.playerHealth >100){
                this.playerHealth =100;
            }
            this.addLogMessages('player','heal',healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner='monster';
        },
        addLogMessages(who,what,value){
            const logObject={
                actionBy:who,
                actionType:what,
                actionValue:value
            };
            this.logMessages.unshift(logObject);
        }
    }
});

app.mount('#game');