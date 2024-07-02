# Caribbean Creole Languages Translation
This repository contains the data and models for the Caribbean Languages Project. The Caribbean region remains largely underdeveloped in the field of computing. The recent emphasis on AI, especially in the field of NLP has further widened this gap both in terms of resources and expertise. We are a team of researchers born and raised in the Caribbean deeply committed to developing the region's technology landscape. We believe that AI can be a major force in bridging the linguistic and technological divides in the Caribbean region. This collaborative project is focused on developing NLP models for speech and translation for Caribbean Creole languages.

## Collaborators
- University of Michigan
  - Christopher Clarke
  - Roland Daynauth
  - Dr Jason Mars
- University of Guyana (Guyanese Languages Unit)
  - Charlene Wilkinson
  - Prof Hubert Devonish

### V1 Data and Models from Guylingo: The Republic of Guyana Creole Corpora

V1 translation models are available on Hugging Face. The models were trained on the Guylingo dataset. The dataset is a collection of Guyanese Creole sentences and their English translations. The dataset is available in the `data` folder. The models are available on Hugging Face here: [Guylingo Models](https://huggingface.co/daynauth). See example inference script in the notebook `inference.ipynb`.

### Example Usage
```python
from transformers import Seq2SeqTrainer, AutoModelForSeq2SeqLM, AutoConfig, AutoTokenizer

model_dict = {}
HF_USER = 'daynauth'

def load_model_params(model_name_or_path):
  config = AutoConfig.from_pretrained(
      model_name_or_path,
      cache_dir=None,
      revision="main",
      token=None,
      trust_remote_code=False
  )
  tokenizer = AutoTokenizer.from_pretrained(
      model_name_or_path,
      cache_dir=None,
      use_fast=True,
      revision="main",
      token=None,
      trust_remote_code=False
  )
  model = AutoModelForSeq2SeqLM.from_pretrained(
      model_name_or_path,
      from_tf = False,
      config=config,
      cache_dir=None,
      revision="main",
      token=None,
      trust_remote_code=False
  )

  return config, tokenizer, model


def get_model_from_dict(model_name):
  return load_model_params(model_name)

def load_model(model_name):
  return get_model_from_dict(model_name)


def translate(input_text, model, tokenizer):
  model_input = tokenizer(input_text, max_length=1024, padding=False, truncation=True, return_tensors = "pt")
  output = model.generate(**model_input)
  translation = tokenizer.decode(output[0], skip_special_tokens=True)
  return translation

def translate_english_to_creole(input_text, model_str = 't5-large'):
  model_name_or_path = model_str + '-en-creole'
  model_name_or_path = HF_USER + '/' + model_name_or_path
  config, tokenizer, model = load_model(model_name_or_path)

  input_text = f"Translate English to Creole: {input_text}"
  return translate(input_text, model, tokenizer)

def translate_creole_to_english(input_text, model_str = 't5-large'):
  model_name_or_path = model_str + '-creole-en'
  model_name_or_path = HF_USER + '/' + model_name_or_path
  config, tokenizer, model = load_model(model_name_or_path)

  input_text = f"Translate Creole to English: {input_text}"
  return translate(input_text, model, tokenizer)

input_text = "I started talking (but may not finish)"
translation = translate_english_to_creole(input_text, model_str = 't5-large')
print(translation)
```

If you would find our work useful, please consider citing our work using the following BibTeX entry:
```bibtex
@misc{clarke2024guylingorepublicguyanacreole,
      title={Guylingo: The Republic of Guyana Creole Corpora}, 
      author={Christopher Clarke and Roland Daynauth and Charlene Wilkinson and Hubert Devonish and Jason Mars},
      year={2024},
      eprint={2405.03832},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2405.03832}, 
}
```


### TODO
- [x] Allow editing of Prompt and context when translating
- [x] Generate function that generates a set number of sythentic translation pairs
- [ ] Password protect the CRUD operations
- [x] Import sentence pairs from a ~~csv~~ file (for bulk upload)