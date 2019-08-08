const rule = context => {
  return {
    VariableDeclarator: node => {
      const option = context.options[0]
      if (!node.init) return
      const taggedTemplateExpression = node.init
      if (taggedTemplateExpression.type !== 'TaggedTemplateExpression') return
      const memberExpression = taggedTemplateExpression.tag
      if (taggedTemplateExpression.tag.type !== 'MemberExpression') return
      const objectIdentifier = memberExpression.object
      if (objectIdentifier.type !== 'Identifier') return
      if (objectIdentifier.name !== 'styled') return
      const idIdentifier = node.id
      if (idIdentifier.type !== 'Identifier') return
      const { pattern, startsWith, endsWith } = option.tagStyle
      if (pattern) {
        if (idIdentifier.name.match(new RegExp(pattern))) return
        context.report({ node, message: `${idIdentifier.name} must match '${pattern}'` })
        return
      }
      if (startsWith && !idIdentifier.name.startsWith(startsWith)) {
        context.report({ node, message: `${idIdentifier.name} must starts with ${startsWith}` })
        return
      }
      if (endsWith && !idIdentifier.name.endsWith(endsWith)) {
        context.report({ node, message: `${idIdentifier.name} must ends with ${endsWith}` })
        return
      }
    },
  }
}

const styleSchema = {
  type: 'object',
  properties: {
    startsWith: { type: 'string' },
    endsWith: { type: 'string' },
    pattern: { type: 'string' },
  },
}

rule.schema = [
  {
    type: 'object',
    properties: {
      tagStyle: styleSchema,
    },
  },
]

module.exports = rule
