# Ugh Client

A command line app for interacting with ugh.

## Setup

First install the CLI from npm:

``` bash
npm install -g ugh-client
```

Next, configure the client to point to the URL for
the ugh server:

``` bash
ugh configure issuesUrl http://yoururl.com/issues
```

## Usage

Whenever you hit an issue while working just type:

``` bash
ugh start
```

Whenever your problem is resolved type:

``` bash
ugh stop
```

The ugh client will then prompt you for details about how your issue

``` bash
> What was the issue?
The installation for some of the dependencies has changed. I had to
comment out code to get through it... Never figured out how to get the
dependencies installed.
```

Ugh will then give you a UUID you can use to reference the issue.

## Commands Reference

### configure

``` bash
ugh configure <option> <value>
```

### start

``` bash
ugh start
```

### end

``` bash
ugh end
> What was the issue?
```