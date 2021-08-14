import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

        actions: {
            /* 왜 actions를 사용하나? 비동기로 외부 함수 호출하기 위해서
             * actions 에는 메서드만 등록 가능하다.
             * 첫번째인자: 무조건 mutations로 고정.
             * 두번째인자: 값. store.dispatch()호출시 넘겨지는 값.
             */

            addTodo: function( mutations/* 고정 */, newTodoItem ){
                mutations.commit("addTodo", newTodoItem);
            },
            doneToggle: function( mutations/* 고정 */, id ){
                mutations.commit("doneToggle", id);
            },
            removeTodo: function( mutations/* 고정 */, id ){
                debugger
                mutations.commit("removeTodo", id);
            },
            clearAll: function( mutations/* 고정 */ ){
                mutations.commit("clearAll");
            },


        },
        mutations: {
            /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
             * mutations 에는 메서드만 등록 가능하다.
             * 첫번째인자: 무조건 state 로 고정.
             * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
             * */
            addTodo: function(state/* 고정 */, newTodoItem/* mutations.commit 호출시 넘겨지는 값 */){
                let maxObj = null;
                if (state.todoItems.length > 0) {
                    maxObj = state.todoItems.reduce((prevObj, curtObj) => {
                        if (prevObj.id >= curtObj.id) {
                            return prevObj;
                        } else {
                            return curtObj;
                        }
                    });
                } else {
                    maxObj = {
                        id: 0
                    };
                }

                const newTodo = {
                    id: maxObj.id + 1,
                    todo: newTodoItem,
                    done: false
                };

                state.todoItems.push( newTodo );
                //this.$data.todoItems[this.$data.todoItems.length] = newTodo;
                //this.$set(this.$data.todoItems,this.$data.todoItems.length,newTodo );
            },
            doneToggle: function(state/* 고정 */, id/* mutations.commit 호출시 넘겨지는 값 */){
                // 방법3
                // 복제 후 재할당 해야함
                const newitems = state.todoItems.map((item) => {
                    if( item.id === id) {
                        item.done = !item.done;
                        return item;
                    }
                    else {
                        return item;
                    }
                });

                state.todoItems  = newitems;


            },
            removeTodo: function(state/* 고정 */, id /* mutations.commit 호출시 넘겨지는 값 */){
                // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
                // 방법1: array.splice() 을 사용하는 방법
                // 방법2: array.map() 을 사용하는 방법
                 const index = state.todoItems.findIndex(function (item) {
                //return item.id === id;
                if (item.id === id) {
                    return true;
                } else {
                    return false;
                }
            });
                state.todoItems.splice(index, 1);
            },
            clearAll: function(state/* 고정 */){
                // 전체 삭제
                // state.todoItems = [];
                state.todoItems = [];
            }
        },
        state: {
            /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
            todoItems: [
                { id: 1, todo: "영화보기", done: false },
                { id: 2, todo: "주말 산책", done: true },
                { id: 3, todo: "ES6 학습", done: false }
            ]
        },
        getters: {
            /* state 변경 정보를 컴포넌트에 전달하는 역활.
             * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
             * 첫번째인자: 무조건 state
             * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
             * 예시) message()=> store.getters.인자;
             */
            todoItems: function(state/* 고정 */){
                return state.todoItems;
            },
        },
    });