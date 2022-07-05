const AddBook = {
    emits : ["submitedBook"],
    template : `
    <div class="row">
    <div class="col-md-6 mx-auto my-4">
        <h3 class="border-bottom py-2">
        Ajouter un livre
        </h3>
        <form @submit="submit">
            <div class="form-group">
                <input type="text" class="form-control"
                v-model="book.ref"
                v-bind:class="book.ref.length ? validClass : errorClass" placeholder="Reference">
            </div>
            <div class="form-group">
                <input type="text" class="form-control"
                v-model="book.title"
                :class="book.title.length ? validClass : errorClass" placeholder="Titre">
            </div>
            <div class="form-group">
                <textarea cols="30" rows="5" class="form-control"
                v-model="book.description"
                :class="book.description.length ? validClass : errorClass" placeholder="Description"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">
                    Valider</button>
            </div>
        </form>
      </div>
 </div>
    `,

    data(){
        return {
            book : {
                ref : "",
                title : "",
                description : ""
            },
            errorClass : "form-control is-invalid",
            validClass : "form-control is-valid"
        };
    },

    methods : {
        submit($event){
            $event.preventDefault();
            this.$emit("submitedBook", this.book)
            setTimeout(() => {
                this.book = {
                    ref : "",
                    title : "",
                    description : "",
                }
            }, 2000)
        }
    }
};

const App = {

    template : ` 
    <div class="container">
    <AddBook @submitedBook="addBook"/>
    <div class="col-md-8 mx-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Titre</th>
                        <th>Descreption</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book,index) in books" :key="index">
                        <td>{{ book.ref }}</td>
                        <td>{{ book.title }}</td>
                        <td>{{ book.description }}</td>
                        <td>
                            <span @click="removeBook(index)" class="btn btn-danger font-weight-bold">
                            X
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,

    components : { AddBook },

    data(){
        return {
            books : [{
                ref : "12984RHG",
                title : "The missing link",
                description : "This is a great book for learning web development",
            }]
        };
    },

    methods : {
        removeBook(index){
            this.books.splice(index, 1);
        },
        addBook(book){
            this.books.push(book);
        }
    }
};

Vue.createApp(App).mount("#app");