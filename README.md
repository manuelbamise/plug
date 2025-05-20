# plug
contains the files, folders and assets for the frontend of the application


Essentially the baseline function of the application is to take user prompt and an information model they choose and pass it to the backend, which then
  + webscrapes the internet or use the searchAPI to get current information based on the user prompt.
we then pass the response from this and pass it to the llm and have it generate content ideas,potential taglines, tags, description etc for the prompt.

  + or we just pass the user prompt directly to the llm and based on the model chosen by the user, the llm generates the response and then passes it to the UI.
