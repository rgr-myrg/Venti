#!/bin/bash
#Build Script for http://DevShop.Me

JS_TEMP="build/tmp.js"
LICENSE="LICENSE"
ARTIFACT="venti"
FILES=(venti listener event);

echo -n "Compiling Venti..."

list=""

for i in "${FILES[@]}"
do :
	list+="--js src/"$i".js "
done

artifact="build/"$ARTIFACT".js"

echo -n "Creating artifact "$artifact

java -jar lib/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS $list --js_output_file $JS_TEMP
cat $LICENSE $JS_TEMP > $artifact
rm $JS_TEMP

cp -p build/venti.js example/venti.js

if [ $? -ne 0 ]; then
	exit 1
fi
	echo "OK"
 

