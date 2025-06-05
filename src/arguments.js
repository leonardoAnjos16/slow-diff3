import { Command } from 'commander'

export const parseCommandLineArguments = () => {
  const program = new Command()
    .arguments('<left> <base> <right>')
    .option('-m, --merge', 'Outputs the result of merging the input files', false)
    .parse()

  return {
    args: program.args,
    options: program.opts()
  }
}
