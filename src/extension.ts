import * as vscode from 'vscode';

import $$ from 'dodollar';

const spawnCommand = require('spawn-command');

export function activate(context: vscode.ExtensionContext) {
  const run = () => {
    vscode.window.showInformationMessage('Bun run!');

    // Get fsPath.
    const fsPath = vscode.window.activeTextEditor?.document.uri.fsPath;

    // Open output channel.
    const outputChannel = vscode.window.createOutputChannel('Bun');
    outputChannel.show(true);
    outputChannel.appendLine('[Running Code by Bun]');

    // Execute command.
    const process = spawnCommand(`bun ${fsPath}`);
    process.stdout.on('data', (data: any) => {
      $$.start().title('Shell command execution').log(data).blankLine().end();
      outputChannel.appendLine(data);
    });
    process.stderr.on('data', (data: any) => {
      outputChannel.appendLine(data);
    });
  };

  context.subscriptions.push(vscode.commands.registerCommand('bun.run', run));
}

// this method is called when your extension is deactivated
export function deactivate() {}
