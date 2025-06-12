# Slow diff3

This repository is an **attempt** at implementing a (slower) version of diff3's algorithm for study and research purposes.

## How to use

This is a Node.js project, so start by [installing Node.js](https://nodejs.org/en), if you haven't already. With node installed:

1. Clone this repository and navigate to its directory in your machine (`cd slow-diff3`)
2. Install dependencies by running `npm install`
3. Execute the program

Currently, the program supports two modes: `chunks` and `merge`.

### `chunks`

This is the default mode, it will output the computed chunks according to diff3's algorithm for the three given files.

To run the program in this mode, just input the paths of the left, base and right revision files.

```bash
node src/index.js leftPath basePath rightPath
```

### `merge`

This mode will output the result of merging the three given files, according to diff3's strategy.

You can run the program in this mode by providing an additional `-m` (or `--merge`) flag to the above command.

```bash
node src/index.js leftPath basePath rightPath -m
```

## Options

You can see the full list of options by running the program with the `-h` option:

```bash
node src/index.js -h
```

One option that you may find useful is the `-d` (`--debug`) one. It will output useful info for debugging merges/computed chunks.
Right now, it only outputs the computed matchings between left and base and base and right revisions, in the same manner chunks are printed.
