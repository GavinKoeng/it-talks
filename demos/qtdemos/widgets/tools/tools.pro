TEMPLATE      = subdirs
SUBDIRS       = \
                codecs \
                completer \
                customcompleter \
                echoplugin \
                i18n \
                regexp \
                regularexpression \
                settingseditor \
                styleplugin \
                treemodelcompleter \
                undo \
                undoframework

contains(DEFINES, QT_NO_TRANSLATION): SUBDIRS -= i18n

!qtConfig(library) {
    SUBDIRS -= \
        echoplugin \
}
