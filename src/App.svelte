<script>
  import { db } from "./firebase";
  import toastr from "toastr";

  let quizForm = [
    { type: "textarea", value: "", name: "question" },
    { type: "input", value: "", name: "optionOne" },
    { type: "input", value: "", name: "optionTwo" },
    { type: "input", value: "", name: "optionThree" },
    { type: "input", value: "", name: "optionFour" },
  ];

  let quizForms = [];

  db.collection("quizForm").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    quizForms = [...docs];
    console.log(quizForms);
  });

  let options = quizForm.filter((field) => field.name.includes("option"));
  let stateArr = options.map(() => false);

  const handleSubmit = async () => {
    let finalAnswers = {};

    quizForm.forEach((field) => {
      finalAnswers[field.name] = field.value;
    });

    // addQuestion();
    await db
      .collection("quizForm")
      .doc()
      .set({
        ...finalAnswers,
        createdAt: Date.now(),
      });
    toastr.success("New question created", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  };

  const handleAnswer = (name) => {
    const index = options.findIndex((field) => field.name === name);
    stateArr = stateArr.map((_, i) => i === index);
  };

  const deleteQuiz = async (id) => {
    await db.collection("quizForm").doc(id).delete();
  };
</script>

<div class="container p-4">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form on:submit|preventDefault={handleSubmit} class="card card-body">
        {#each quizForm as field, index}
          {#if field.type === "input"}
            <div class="form-group">
              <input
                on:click={() => handleAnswer(field.name)}
                bind:value={field.value}
                class="form-control"
                type="text"
                placeholder="Inserta una opcion"
              />
              {#if stateArr[options.findIndex((x) => x.name === field.name)]}
                <p>Respuesta Correcta</p>
              {/if}
            </div>
          {:else if field.type === "textarea"}
            <div class="form-group">
              <textarea
                bind:value={field.value}
                class="form-control"
                rows="3"
                placeholder="Escribe una pregunta"
              />
            </div>
          {/if}
        {/each}
        <button class="btn btn-primary">Guardar</button>
      </form>

      {#each quizForms as quizForm}
        <div class="card card-body mt-2">
          <h5>{quizForm.question}</h5>
          <button class="btn btn-danger" on:click={deleteQuiz(quizForm.id)}
            >Eliminar</button
          >
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
