{
  description = "Dev environment for hpn4.github.io (React + Vite + TypeScript portfolio)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "hpn4-portfolio";

          packages = with pkgs; [
            nodejs_22
            imagemagick
          ];

          shellHook = ''
            echo "hpn4.github.io: node $(node -v), npm $(npm -v)"
            if [ ! -d node_modules ]; then
              echo "Tip: run 'npm install' to set up dependencies."
            fi
          '';
        };
      });
}
