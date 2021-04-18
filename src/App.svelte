<script>
  import { db } from "./firebase";

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
    console.log("New question created");
  };

  const handleAnswer = (name) => {
    const index = options.findIndex((field) => field.name === name);
    stateArr = stateArr.map((_, i) => i === index);
  };

  const deleteQuiz = async (id) => {
    await db.collection("quizForm").doc(id).delete();
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#each quizForm as field, index}
    {#if field.type === "input"}
      <input
        on:click={() => handleAnswer(field.name)}
        bind:value={field.value}
        type="text"
        placeholder=""
      />
      {#if stateArr[options.findIndex((x) => x.name === field.name)]}
        <p>Respuesta Correcta</p>
      {/if}
    {:else if field.type === "textarea"}
      <textarea
        bind:value={field.value}
        rows="3"
        placeholder="Escribe una pregunta"
      />
    {/if}
  {/each}
  <button type="submit">Guardar</button>
</form>

{#each quizForms as quizForm}
  <h5>{quizForm.question}</h5>
  <button on:click={deleteQuiz(quizForm.id)}>Eliminar</button>
{/each}

<style>
</style>
