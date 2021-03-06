# Contributing

## Getting Started

Before submitting a pull request, please read the [Code of Conduct](#code-of-conduct).

### Pre-requisites

To get started, we assume you have:

- Basic terminal knowledge
- NodeJS LTS installed

### Installation

First, clone the repository:

```
https://github.com/chrisdmacrae/chrisdmacrae.com.git
```

Then, initialize the node dependencies with `npm``:

```
npm install
```

### Development

To start developing locally, you can run the `dev` command:

```
npm run dev
```

### Production Builds

A production build can be generated by running the `build` command:

```
npm run build
```

### Deployments

Deployments are handled by [Vercel][]:

- *Production* is served from the latest code in the `master` branch
- *Development* environments are generated for every other branch
- *Preview* environments are generated for every pull request, and the URL will be provided in the pull request.

## Code of Conduct

Don't be a jerk.

[Vercel]: https://vercel.com