# fictional-spork

This is a work notes of solutions, decisions and mind flow that I had during the test task implementation.

## Choosing the solution

My first thought was to use the same algorithm that LLM uses for parsing text into tokens, save it as integer with a 
number of edits and then, using the topological sort, find the closest match from the neighboring cells in matrix, but
due to the fact that words in the list are already tokens, I think this would be not what I am trying to achieve.
Also, when tokenising word that is not part of a context, e.g. Ubisoft and Ubisoft Montreal - that would be not even
close by the digit representation.

Algorithms like Levenshtein Distance and Smith-Waterman we used for the searching products on some of the previous 
e-commerce projects (needed to google the names and remind myself how they do work) - could be used and even do the work.
Levenshtein distance would give us better score when there would be a match of company name, but... same as city name or
country name, so that is definitely not an option.

Here I googled a bit (chatgptgled) and found that there are pretrained models, ready-made libraries that are using...
Levenshtein algorithm under the hood, I decided to use raw Levenshtein and some ready library to run then synchronously
and compare the results. Also, decided skip ML models this time :D however, I have been using one recently for some
other pet project.

Conclusion: solution would run in parallel Levenshtein and ready-made library and give both results.
Upd: Also added Jaccard.

If needed, solution can be scaled to have multiple algorithms under the hood to get better results.

## Implementation

### Backend

I am setting up NestJS with Fastify (so much time heard of it, never tried on practice). No renaming, just adding code.
Added also some packages to make it work with file upload.

### What would I improve here first?

Preload candidates into memory. DB, Redis, Elastic, whatever, depends on a need and demand and size.
Add more algorithms, more fine-tuned options and make a scoreboard, like double elimination etc. to have
more data to decide on a match. Would add probably some useless words filter like "studios", "ltd" and country names,
depends on the product. Ideally, add a context to the algorithm in a way that would be more precise. And cherry on the top:
use also LLM model for the reference if it is not overkill. Depends on the results and targets.
ADD RECURSION to have clean code. Currently, one more algorithm will make it unreadable.
Add traces for the telemetry, spans and memory snapshots.
Add processing by chunks.
Add asynchronous processing with process polling (for the API) and notifying FE that it is ready.
Basically going production ready, FE agnostic solution monitored for bottlenecks.

P.S.> I would even put it into AWS Lambda, it seems to me like the best option here.

Adventure spirit to the max: make a pretrained model using TensorFlow + PyTorch that would combine all algorithms and decide,
based on the length, words and context, is that a match or not.

### Frontend

Here less passion, simple Vite React TS App with some sprinkles of MUI.

### What would I improve here?

Add error handling, progress bar, some better output, add some UX heatmap, tons of RUM etc. List is basically endless.

More of the endless list: FE compiled into libraries, uploaded to S3 or some CDN to make it load the geographically closest file,
will split into saga or some async notification when calculation is ready. Still endless.