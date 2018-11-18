#JSON Unfold

JSON Unfold is a functionality designed to convert JSON to a array of paths in following way:

```json
{
  "a": {
    "b": "3",
    "c": [1, 1, 2, 3, "5"]
  },
  "d": "hello",
  "e": true,
  "f": {
    "g": null
  },
  "h": [],
  "i": {}
}
```
→
```javascript
[
  'a.b: string',
  'a.c[0]: number',
  'a.c[1]: number',
  'a.c[2]: number',
  'a.c[3]: number',
  'a.c[4]: string',
  'd: string',
  'e: boolean',
  'f.g: null',
  'h: array',
  'i: object'
]
```

The purpose of JSON Unfold is to supply communication between developers when discussing the API. It is usually tedious to build the full path by hand, so JSON Unfold comes handy here.

##Avoiding ambiguity

You can use "." in the key names. Presence of dot leads to ambiguous interpretation in the following case.

```json
{
  "a.b": {
    "c": {
        "d": 3
    }
  }
}
```
→
```javascript
[ 'a.b.c.d: number' ]
```

What is it supposed to do for such cases? For such cases, the program uses the rollback of the delimiter. Thus JSON Unfold utilizes the character "\" that is forbidden for JSON keys. That is, for the similar input, the following result is obtained:

```json
{
  "a.b": {
    "c": {
        "d": 3
    }
  }
}
```
→
```javascript
[ 'a.b\\c\\d: number' ]
```
