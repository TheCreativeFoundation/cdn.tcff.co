# CDN for The Creative Foundation

This is the main repository containing all static files for everything and every project in The Creative Foundation. Images, javascript, and stylesheets will all be located here.

This repo is connected to Travis CI to automatically deploy changes to our AWS S3 bucket that has static website hosting enable. Then, we leverage CloudFlare as the actual CDN serving the static files, which is located at [cdn.tcff.co]("https://cdn.tcff.co")
