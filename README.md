GitHub Greedy Collector
==

Clone a repository (that is hosted on GitHub) automatically just by accessing repository page by Chrome.

Usage
--

### Server

Run the server on your local environment:

```
$ ./ggc-server
```

### Client

Install extension on your Chrome.

And access repository page, then repository is cloned into local environment automatically.

Configuration
--

### Listening Port

#### Server

You can use `--port` option, for example;

```
$ ./ggc-server --port 12345
```

#### Client

You can configure via option page of Chrome extension.

### Directory for cloned repository

You can use `--dir` option when run a server.
Default, server uses `./ggc` to store cloned repository.

### Specify Other Hosts

Default, this extension supports only `https://github.com`.
If you want to use this extensi on other hosts (e.g. your companies GitHub Enterprise),
you can specify that by option page of Chrome extension.

Author
--

moznion (<moznion@gmail.com>)

License
--

```
The MIT License (MIT)
Copyright © 2015 moznion, http://moznion.net/ <moznion@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

