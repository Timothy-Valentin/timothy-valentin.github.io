/**
 * Grammaire TextMate minimale pour Cisco IOS (non fournie par Shiki) :
 * commentaires « ! », négation « no », mots-clés de configuration,
 * interfaces, adresses IPv4/masques, nombres et secrets masqués.
 */
export default {
  name: 'cisco',
  scopeName: 'source.cisco',
  aliases: ['ios', 'cisco-ios'],
  patterns: [
    { name: 'comment.line.cisco', match: '!.*$' },
    { name: 'markup.deleted.cisco', match: '<masqué>' },
    { name: 'keyword.control.negation.cisco', match: '^\\s*no\\b' },
    {
      name: 'entity.name.section.cisco',
      match:
        '^\\s*(interface|vlan|line|router|ip access-list|archive|banner|crypto|hostname|username|spanning-tree|ntp|logging|errdisable|vtp)\\b',
    },
    {
      name: 'keyword.other.cisco',
      match:
        '\\b(switchport|mode|access|trunk|native|allowed|nonegotiate|port-security|maximum|violation|restrict|shutdown|sticky|portfast|bpduguard|channel-group|active|description|name|permit|deny|log|transport|input|ssh|login|local|secret|snooping|trust|inspection|limit|rate|storm-control|broadcast|level|server|prefer|key|source|host|trap|informational|enable|recovery|cause|interval|address|default-gateway|domain-name|version|dot1q|tag|access-class|exec-timeout|authenticate|trusted-key)\\b',
    },
    {
      name: 'support.type.interface.cisco',
      match:
        '\\b(GigabitEthernet|TenGigabitEthernet|FastEthernet|Port-channel|Vlan|range)[0-9/\\-\\s,]*',
    },
    { name: 'constant.numeric.ip.cisco', match: '\\b\\d{1,3}(\\.\\d{1,3}){3}(/\\d{1,2})?\\b' },
    { name: 'constant.numeric.cisco', match: '\\b\\d+(\\.\\d+)?\\b' },
    { name: 'string.unquoted.banner.cisco', match: '\\^' },
  ],
};
