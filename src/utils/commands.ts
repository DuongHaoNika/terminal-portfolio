import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  whoami: () => '>> Name: Duong Quang Hao\n>> University: Hoc vien Cong nghe Buu Chinh Vien thong\n>> Major: Information Security',
  echo: (args: string[]) => args.join(' '),
  contact: () => `>> Facebook: facebook.com/haonika\n>> Github: github.com/DuongHaoNika\n>> Email: quanghao.work@gmail.com`,
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:quanghao.work@gmail.com`);

    return `Opening mailto:quanghao.work@gmail.com...`;
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  
  banner: () => `
██╗  ██╗ █████╗  ██████╗ ███╗   ██╗██╗██╗  ██╗ █████╗ 
██║  ██║██╔══██╗██╔═══██╗████╗  ██║██║██║ ██╔╝██╔══██╗
███████║███████║██║   ██║██╔██╗ ██║██║█████╔╝ ███████║
██╔══██║██╔══██║██║   ██║██║╚██╗██║██║██╔═██╗ ██╔══██║
██║  ██║██║  ██║╚██████╔╝██║ ╚████║██║██║  ██╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ v1.0.0
>> About me: whoami
>> Contact: contact
>> Clear: clear
Type 'help' to see list of available commands.
`,
};
